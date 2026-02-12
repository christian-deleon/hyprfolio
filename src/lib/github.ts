import type { ProjectItem } from '@/types/config';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const PINNED_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            primaryLanguage {
              name
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GitHubPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes: GitHubPinnedRepo[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export async function fetchPinnedRepos(
  username: string,
): Promise<ProjectItem[]> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      'GITHUB_TOKEN environment variable is required to fetch pinned repositories',
    );
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API returned ${response.status}: ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GitHubGraphQLResponse;

  if (json.errors?.length) {
    throw new Error(
      `GitHub GraphQL error: ${json.errors.map((e) => e.message).join(', ')}`,
    );
  }

  const repos = json.data?.user?.pinnedItems?.nodes;

  if (!repos) {
    throw new Error(
      `GitHub user "${username}" not found or has no pinned items`,
    );
  }

  return repos.map(repoToProjectItem);
}

function repoToProjectItem(repo: GitHubPinnedRepo): ProjectItem {
  const technologies: string[] = [];

  if (repo.primaryLanguage?.name) {
    technologies.push(repo.primaryLanguage.name);
  }

  for (const { topic } of repo.repositoryTopics.nodes) {
    if (!technologies.includes(topic.name)) {
      technologies.push(topic.name);
    }
  }

  return {
    name: repo.name,
    description: repo.description ?? '',
    url: repo.homepageUrl || repo.url,
    technologies,
    highlights: [],
    featured: true,
  };
}
