type DividerProps = React.HTMLAttributes<HTMLDivElement>

export const Divider: React.FunctionComponent<DividerProps> = (props) => {
  return <div className="border-b" {...props} />
}
