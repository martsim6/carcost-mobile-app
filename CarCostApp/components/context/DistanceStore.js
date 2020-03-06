import React, { createContext, Component } from 'react';

export const DistanceStore = createContext();

function DistanceStoreProvider(props){
	const [distance, setDistance] = React.useState({
		oldDistance: 100000,
	})
	const changeDistance = (value) => {
		setDistance({oldDistance: value})
	}

	return(
		<DistanceStore.Provider value={{...distance, changeDistance: changeDistance}}>
			{props.children}
		</DistanceStore.Provider>
	);
}

export default DistanceStoreProvider;