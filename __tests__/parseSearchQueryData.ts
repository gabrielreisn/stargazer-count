import { SearchRepositoriesQuery } from "@/generated/graphql/graphql";
import { parseSearchQueryData } from "@/modules/parseSearchQueryData";

const inputData: SearchRepositoriesQuery = {
  "search": {
    "edges": [
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnkzNjUzNTE1Ng==",
          "name": "redux",
          "url": "https://github.com/reduxjs/redux",
          "stargazerCount": 60067,
          "forkCount": 15471
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk0Njg5MDIwMg==",
          "name": "ReduxSimpleStarter",
          "url": "https://github.com/StephenGrider/ReduxSimpleStarter",
          "stargazerCount": 3566,
          "forkCount": 4707
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk0ODk1NzI2Mw==",
          "name": "ReduxCasts",
          "url": "https://github.com/StephenGrider/ReduxCasts",
          "stargazerCount": 2574,
          "forkCount": 1751
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnkzODkzNDQ0OQ==",
          "name": "react-redux",
          "url": "https://github.com/reduxjs/react-redux",
          "stargazerCount": 23026,
          "forkCount": 3386
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk0NzA3MTk0MQ==",
          "name": "redux-saga",
          "url": "https://github.com/redux-saga/redux-saga",
          "stargazerCount": 22497,
          "forkCount": 2040
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnkzOTAxMzkwOQ==",
          "name": "redux-thunk",
          "url": "https://github.com/reduxjs/redux-thunk",
          "stargazerCount": 17699,
          "forkCount": 1084
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk0NDg2OTA3OA==",
          "name": "redux-devtools-extension",
          "url": "https://github.com/zalmoxisus/redux-devtools-extension",
          "stargazerCount": 13477,
          "forkCount": 1076
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk1MTcyNjM1MA==",
          "name": "redux-saga-beginner-tutorial",
          "url": "https://github.com/redux-saga/redux-saga-beginner-tutorial",
          "stargazerCount": 578,
          "forkCount": 545
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk0MDAxMzQzNQ==",
          "name": "redux-form",
          "url": "https://github.com/redux-form/redux-form",
          "stargazerCount": 12592,
          "forkCount": 1688
        }
      },
      {
        "node": {
          "__typename": "Repository",
          "id": "MDEwOlJlcG9zaXRvcnk1MDE1MTA3NQ==",
          "name": "react-redux-links",
          "url": "https://github.com/markerikson/react-redux-links",
          "stargazerCount": 22385,
          "forkCount": 2526
        }
      }
    ]
  }
}

const outputData = [
  {
    "id": "MDEwOlJlcG9zaXRvcnkzNjUzNTE1Ng==",
    "name": "redux",
    "url": "https://github.com/reduxjs/redux",
    "stargazerCount": 60067,
    "forkCount": 15471
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk0Njg5MDIwMg==",
    "name": "ReduxSimpleStarter",
    "url": "https://github.com/StephenGrider/ReduxSimpleStarter",
    "stargazerCount": 3566,
    "forkCount": 4707
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk0ODk1NzI2Mw==",
    "name": "ReduxCasts",
    "url": "https://github.com/StephenGrider/ReduxCasts",
    "stargazerCount": 2574,
    "forkCount": 1751
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnkzODkzNDQ0OQ==",
    "name": "react-redux",
    "url": "https://github.com/reduxjs/react-redux",
    "stargazerCount": 23026,
    "forkCount": 3386
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk0NzA3MTk0MQ==",
    "name": "redux-saga",
    "url": "https://github.com/redux-saga/redux-saga",
    "stargazerCount": 22497,
    "forkCount": 2040
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnkzOTAxMzkwOQ==",
    "name": "redux-thunk",
    "url": "https://github.com/reduxjs/redux-thunk",
    "stargazerCount": 17699,
    "forkCount": 1084
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk0NDg2OTA3OA==",
    "name": "redux-devtools-extension",
    "url": "https://github.com/zalmoxisus/redux-devtools-extension",
    "stargazerCount": 13477,
    "forkCount": 1076
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk1MTcyNjM1MA==",
    "name": "redux-saga-beginner-tutorial",
    "url": "https://github.com/redux-saga/redux-saga-beginner-tutorial",
    "stargazerCount": 578,
    "forkCount": 545
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk0MDAxMzQzNQ==",
    "name": "redux-form",
    "url": "https://github.com/redux-form/redux-form",
    "stargazerCount": 12592,
    "forkCount": 1688
  },
  {
    "id": "MDEwOlJlcG9zaXRvcnk1MDE1MTA3NQ==",
    "name": "react-redux-links",
    "url": "https://github.com/markerikson/react-redux-links",
    "stargazerCount": 22385,
    "forkCount": 2526
  }
]


describe('parseSearchQueryData', () => {
  test('should return parsed value correctly', () => {

    expect(parseSearchQueryData(inputData)).toEqual(outputData)
  });

  test('should return an empty array in case of undefined data', () => {

    expect(parseSearchQueryData(undefined)).toEqual([])
  });
});