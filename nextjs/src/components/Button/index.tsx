type TitleProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FunctionComponent<TitleProps> = (props) => {
  return (
    <button
      type="submit"
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-800">
      {props.children}
    </button>
  )
}
