import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Apple() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.971 22.465c-1.238 1.2-2.59 1.011-3.893.442-1.377-.581-2.641-.606-4.095 0-1.82.784-2.78.557-3.867-.442C-.052 16.108.858 6.425 7.86 6.072c1.706.088 2.894.935 3.893 1.011 1.491-.303 2.92-1.175 4.512-1.062 1.909.152 3.35.91 4.297 2.276-3.943 2.363-3.008 7.558.607 9.011-.72 1.896-1.656 3.78-3.21 5.17l.012-.013zM11.626 5.996c-.19-2.818 2.099-5.144 4.728-5.371.366 3.26-2.958 5.687-4.728 5.371z"
        fill="#000"
      />
    </Svg>
  )
}

export default Apple
