export const userInfoQuery = `
  query {
    viewer {
      login
      id
    }
  }
`;

export const createContributedRepoQuery = (username: string) => `
  query {
    user(login: "${username}") {
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
