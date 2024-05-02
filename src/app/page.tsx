import Map from '@/components/Map';
import CompleteProvider from '@/components/contexts/CompleteProvider';
import MovedProvider from '@/components/contexts/MovedProvider';

export default function Home() {
	return (
		<MovedProvider>
			<CompleteProvider>
				<Map />
			</CompleteProvider>
		</MovedProvider>
	);
}
