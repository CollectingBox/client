import React, { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import MapLevelController from './MapLevelController';
import LocationIcon from '@/public/icons/location.svg';

interface Props {
	location: { lat: number; lng: number } | undefined;
	setLocation: Dispatch<
		SetStateAction<{ lat: number; lng: number } | undefined>
	>;
	mapRef: RefObject<kakao.maps.Map>;
	setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const MapController = ({ location, setLocation, mapRef, setCenter }: Props) => {
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
	}, []);

	return (
		<div className="absolute top-0 left-0 w-full h-full">
			<div className="absolute top-6 left-6 flex flex-col gap-S-14 z-10">
				<div className="flex gap-S-12">
					<SearchBar />
					<button
						onClick={onClickLocation}
						className="flex justify-center items-center p-S-14 bg-white rounded-xl Elevation-2-Bottom"
					>
						<LocationIcon />
					</button>
				</div>
				<FilterButtons />
			</div>
			<MapLevelController mapRef={mapRef} />
		</div>
	);
};

export default MapController;

// 1000 5874 0229
