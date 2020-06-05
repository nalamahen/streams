import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../hitstory";
import { IState } from "../../interface";

function StreamDelete(props: any): JSX.Element {
  const handleDelete = () => {
    props.deleteStream(props.match.params.id);
  };

  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const actions = (
    <React.Fragment>
      <button onClick={handleDelete} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  const renderContent = () => {
    let content = "Are you sure you want to delete this stream";
    if (!props.stream) return `${content}?`;

    return `${content} with title: ${props.stream.title}?`;
  };
  return (
    <div>
      <Modal
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
}

const mapStateToProps = (state: IState, ownProps: any) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
