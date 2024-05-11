import React, { RefObject, useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import MapLevelController from './MapLevelController';
import LocationIcon from '@/public/icons/location.svg';
import { MapDataContext } from './contexts/MapDataProvider';
import ReSearchBtn from './ui/ReSearchBtn';

const MapController = () => {
	const {
		mapRef,
		setCenter,
		setSearchCenter,
		location,
		setLocation,
		setQuery,
		searchCenter,
		setIsMoved,
	} = useContext(MapDataContext);
	const onClickLocation = () => {
		if (!location) return;
		setCenter(location);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, [setLocation]);

	useEffect(() => {
		if (location) {
			setCenter(location);
			setSearchCenter(location);
		}
	}, [location, setCenter, setSearchCenter]);

	return (
		<div className="fixed left-0 top-0 w-full px-6 pt-6 xl:static">
			<div className="flex flex-col gap-S-14">
				<div className="flex gap-S-12">
					<SearchBar
						setCenter={setCenter}
						setSearchCenter={setSearchCenter}
						setQuery={setQuery}
						searchCenter={searchCenter}
						setIsMoved={setIsMoved}
					/>
					<button
						onClick={onClickLocation}
						className="Elevation-2-Bottom fixed bottom-14 right-5 flex items-center justify-center rounded-xl bg-white p-S-14 xl:static"
					>
						<LocationIcon />
					</button>
				</div>
				<FilterButtons />
			</div>
			<ReSearchBtn />
			<MapLevelController mapRef={mapRef} />
		</div>
	);
};

export default MapController;
