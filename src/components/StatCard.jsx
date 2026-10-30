import Counter from './Counter.jsx'

// Borderless stat: a thin side line, count-up number and label.
export default function StatCard({ stat, index, ready }) {
  const { value, suffix, label } = stat

  return (
    <li className="stat" style={{ '--i': index }} data-tone>
      <i className="stat-line" aria-hidden="true" />
      <b><Counter to={value} suffix={suffix} run={ready} delay={1400 + index * 180} /></b>
      <span>{label}</span>
    </li>
  )
}
