import React from 'react';

const Header = () => {
  return (
    <header>
      <div
        className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h3 className="my-0 mr-md-auto font-weight-normal"><i>Chat Application</i></h3>
      </div>
    </header>
  );
};

export { Header };