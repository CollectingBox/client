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
		<div className="fixed left-0 top-0 p-6 xl:static">
			<div className="flex flex-col gap-S-14">
				<div className="flex gap-S-12">
					<SearchBar setCenter={setCenter} />
					<button
						onClick={onClickLocation}
						className="Elevation-2-Bottom fixed bottom-14 right-5 flex items-center justify-center rounded-xl bg-white p-S-14 xl:static"
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
