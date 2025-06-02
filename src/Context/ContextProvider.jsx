import Context from './Context.jsx';
import { useState } from 'react';

function ContextProvider(props) {
  const [isDrop, setIsDrop] = useState(false);

  function setIsDropVal(val) {
    setIsDrop(val);
  }

  return (
    <Context.Provider
      value={{
        isDrop,
        setIsDropVal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
