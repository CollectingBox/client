import Map from '@/components/Map';
import Sidebar from '@/components/Sidebar';

export default function Home() {
	return (
		<main className="flex">
			<Sidebar />
			<Map />
		</main>
	);
}
