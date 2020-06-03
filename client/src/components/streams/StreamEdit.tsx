import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStream, editStream } from "../../actions/index";
import { IState } from "../../interface";
import StreamForm from "./StreamForm";

function StreamEdit(props: any): JSX.Element {
  useEffect(() => {
    console.log("StreamEdit UseEffect......");
    props.fetchStream(props.match.params.id);
  }, []);

  const onSubmit = (formValues: any) => {
    props.editStream(props.match.params.id, formValues);
  };

  return (
    <div>
      <h3>Edit Steream</h3>
      <StreamForm
        initialValues={_.pick(props.stream, ["title", "description"])}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const mapStateToProps = (state: IState, ownProps: any) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
