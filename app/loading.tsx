export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
        <p className="text-green-700 text-sm font-semibold tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
