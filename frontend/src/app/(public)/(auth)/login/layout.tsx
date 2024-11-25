export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[90vh]">
      <div></div>
      <div>{children}</div>
    </div>
  );
}
