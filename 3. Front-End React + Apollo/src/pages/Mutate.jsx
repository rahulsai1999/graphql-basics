import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`;

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Mutate = props => {
  const [description, setDesc] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          type="text"
          onChange={e => setDesc(e.target.value)}
          placeholder="Description for the URL"
        />
        <input
          className="mb2"
          type="text"
          onChange={e => setUrl(e.target.value)}
          placeholder="Actual URL"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => props.history.push("/")}
        update={(store, { data: { post } }) => {
          const data = store.readQuery({ query: FEED_QUERY });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data
          });
        }}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default Mutate;
