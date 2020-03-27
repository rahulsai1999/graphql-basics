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

const Mutate = props => {
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          type="text"
          onChange={setDesc}
          placeholder="Description for the URL"
        />
        <input
          className="mb2"
          type="text"
          onChange={setUrl}
          placeholder="Actual URL"
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ desc, url }}
        onCompleted={() => props.history.push("/")}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default Mutate;
