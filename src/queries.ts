export const userInfoQuery = `
  query {
    viewer {
      login
      id
    }
  }
`;

export const userStatusQuery = (username: string) => `
query {
  user(login: "${username}") {
    name
    login
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
    pullRequests(first: 1) {
      totalCount
    }
    issues(first: 1) {
      totalCount
    }
    followers {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
      totalCount
      nodes {
        stargazers {
          totalCount
        }
      }
    }
  }
}
`;

export const createContributedRepoQuery = (username: string) => `
  query {
    user(login: "${username}") {
      createdAt
      repositoriesContributedTo(last: 100, includeUserRepositories: true) {
        totalCount
        nodes {
          forkCount
          stargazerCount
          isFork
          name
          owner {
            login
          }
          primaryLanguage {
            name
            color
          }
        }
      }
      pullRequests(last: 100){
        totalCount
      }
    }
  }
`;

export const createCommittedDateQuery = (username:string, id: string, name: string, owner: string, since: string) => `
  query {
    repository(owner: "${owner}", name: "${name}") {
      name
      defaultBranchRef {
        target {
          ... on Commit {
            history(since: "${since}", author: { id: "${id}" }) {
              totalCount
              edges {
                node {
                  comments {
                    totalCount
                  }
                  committedDate
                  changedFiles
                  additions
                  deletions
                }
              }
            }
          }
        }
      }
      issues(filterBy: {createdBy: "${username}"}){
        totalCount
      }
    }
  }
`;
