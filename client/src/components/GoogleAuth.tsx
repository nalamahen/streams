import React, { useEffect } from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";
import { IState } from "../interface";

declare global {
  interface Window {
    gapi: any;
  }
}

interface IProps {
  signIn: (userId: string) => {};
  signOut: () => {};
  isSignedIn: any;
}

function GoogleAuth(props: IProps): JSX.Element {
  useEffect(() => {
    console.log("usEffect in GoogleAugh rendering...");
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "47684720572-uuko1bc3g8jp6ebodf7qbh2cl62ut91s.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  });
  const onAuthChange = (isSignedIn: boolean) => {
    const currentUserId = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getId();
    isSignedIn ? props.signIn(currentUserId) : props.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={() => {
            window.gapi.auth2.getAuthInstance().signOut();
          }}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={() => {
            window.gapi.auth2.getAuthInstance().signIn();
          }}
        >
          <i className="google icon">Sign In with Google</i>
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
}

const mapStateToProps = (state: IState) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
