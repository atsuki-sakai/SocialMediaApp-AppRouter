export default function PublilcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-white min-h-screen min-w-full flex justify-center items-center">
      {children}
    </main>
  );
}
