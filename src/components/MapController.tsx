import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import MapLevelController from './MapLevelController';
import LocationIcon from '@/public/icons/location.svg';
import ReSearchBtn from './ui/ReSearchBtn';
import { useMapDataStore } from '@/store/useMapDataStore';
import { useShallow } from 'zustand/react/shallow';

const MapController = () => {
	const { setCenter, setSearchCenter, location, setLocation } = useMapDataStore(
		useShallow((state) => state),
	);

	const onClickLocation = () => {
		if (!location) return;
		setCenter(location);
	};
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	useEffect(() => {
		if (location) {
			setCenter(location);
			setSearchCenter(location);
		}
	}, [location]);
	/* eslint-enable react-hooks/exhaustive-deps */
	return (
		<div className="fixed left-0 top-0 w-full px-6 pt-6 xl:static">
			<div className="flex flex-col gap-S-14">
				<div className="flex gap-S-12">
					<SearchBar />
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
			<MapLevelController />
		</div>
	);
};

export default MapController;
