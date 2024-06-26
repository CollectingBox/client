'use client';

import Close from '@/public/icons/close.svg';
import SystemPortal from './SystemPortal';
import { useSystemStore } from '@/store/systemErrorStore';

const SystemErrorModal = () => {
	const { type, isSystemError, setIsSystemError } = useSystemStore();

	if (!isSystemError) return null;

	return (
		<SystemPortal>
			<div
				className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 px-S-16"
				onClick={() => {
					setIsSystemError(false);
				}}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="Elevation-2-Bottom flex w-full max-w-[400px] flex-col gap-S-24 rounded-[16px] border-Gray-100 bg-white p-S-28"
				>
					<div className="flex flex-col justify-between gap-S-20">
						<div className="flex justify-between">
							<p className="text-Gray-900 Title-Large">
								{type === 'SERVER'
									? '일시적인 오류가 발생했습니다'
									: '네트워크에 연결할 수 없습니다'}
							</p>
							<button
								onClick={() => {
									setIsSystemError(false);
								}}
							>
								<Close />
							</button>
						</div>
						<p className="text-Gray-700 Title-Medium">
							{type === 'SERVER'
								? '새로고침을 눌러 다시 시도해주세요.'
								: '인터넷 연결 상태를 확인한 후 다시 시도해주세요.'}
						</p>
					</div>
					<button
						onClick={() => {
							location.reload();
						}}
						className="w-full rounded-[8px] bg-Green-500 px-S-16 py-S-12 text-white"
					>
						{type === 'SERVER' ? '새로고침' : '재시도'}
					</button>
				</div>
			</div>
		</SystemPortal>
	);
};

export default SystemErrorModal;
