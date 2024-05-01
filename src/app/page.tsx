import Map from '@/components/Map';
import MovedProvider from '@/components/contexts/MovedProvider';

export default function Home() {
	return (
		<MovedProvider>
			<Map />
		</MovedProvider>
	);
}
