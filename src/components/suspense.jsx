export default function Suspense ({ loading, children }) {
  if (loading) {
    return  <div></div>
  }
  return  <div>{children}</div>
}