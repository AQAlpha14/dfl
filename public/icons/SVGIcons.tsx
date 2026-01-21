import * as React from "react";

export const Chevron = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 10.5 6 6 1 1.5"
    />
  </svg>
);
export const ArrowSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.62 3.507 1.357 11.77 0 10.412 8.262 2.15H.98V.23h10.56v10.56H9.62V3.508Z"
    />
  </svg>
);
export const CheckSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={1}
      y={1}
      fill="currentColor"
      stroke="currentColor"
      rx={5}
    />
    <path stroke="currentColor" d="m6 10 3 3 5-6" />
  </svg>
);
export const TildeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} fill="currentColor" rx={6} />
    <path
      fill="currentColor"
      d="M11.84 11.5c-1.43 0-2.43-1.359-3.465-1.359-.643 0-1.036.459-1.036 1.359H6c0-1.959.84-3 2.143-3 1.446 0 2.446 1.359 3.482 1.359.643 0 1.036-.459 1.036-1.359H14c0 1.976-.857 3-2.16 3Z"
    />
  </svg>
);
export const StarSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.9.346a.5.5 0 0 1 .95 0l2.107 6.483a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.558L10.67 15.68a.5.5 0 0 0-.588 0l-5.514 4.006a.5.5 0 0 1-.77-.558l2.106-6.483a.5.5 0 0 0-.181-.56L.207 8.08a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346L9.9.346Z"
    />
  </svg>
);
export const CloseSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={1}
      y={1}
      fill="currentColor"
      stroke="currentColor"
      rx={5}
    />
    <path
      stroke="currentColor"
      d="M10.956 10.164 13.434 14h-2.1L9.78 11.424 8.184 14H6.07l2.548-3.892-2.282-3.71h2.1l1.386 2.408 1.47-2.408h2.072l-2.408 3.766Z"
    />
  </svg>
);
export const WarningSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={22}
      height={18}
      x={-1}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.999 2.083.832 17.916h18.333L10 2.083Z"
        clipRule="evenodd"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="M10 14.583v.416m0-7.083.003 4.167"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#EAAB35" d="M0 0h20v20H0V0Z" />
    </g>
  </svg>
);
export const INSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 3.242a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5h-15Zm4.02 4.003c.006.956-.71 1.545-1.559 1.541a1.502 1.502 0 0 1-1.493-1.54 1.493 1.493 0 0 1 1.54-1.504c.88.02 1.518.665 1.513 1.503Zm3.76 2.759H9.758v8.56h2.664V17.224c-.002-1.014-.003-2.029.003-3.042.001-.246.012-.502.075-.737.238-.877 1.027-1.444 1.907-1.305.566.089.94.416 1.097.95.097.332.14.691.145 1.039.012 1.047.01 2.095.008 3.142V18.562h2.671V17.001c-.001-1.13-.002-2.259.001-3.389a6.039 6.039 0 0 0-.178-1.507c-.187-.734-.574-1.342-1.203-1.78-.445-.313-.935-.514-1.482-.536a15.191 15.191 0 0 1-.188-.01c-.28-.015-.564-.03-.831.024-.765.153-1.437.503-1.945 1.12-.06.071-.117.143-.203.25l-.02.025v-1.194Zm-6.598 8.563h2.65v-8.558h-2.65v8.558Z"
      clipRule="evenodd"
    />
  </svg>
);
export const InstaSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 3.242H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-8a5 5 0 0 0-5-5Zm3.25 13a3.26 3.26 0 0 1-3.25 3.25H8a3.26 3.26 0 0 1-3.25-3.25v-8A3.26 3.26 0 0 1 8 4.992h8a3.26 3.26 0 0 1 3.25 3.25v8Zm-2.5-7.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 7.742a4.5 4.5 0 1 0 4.5 4.5 4.49 4.49 0 0 0-4.5-4.5Zm-2.75 4.5a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 0 0-5.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export const TiktokSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={24}
      height={24}
      x={1}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="currentColor" d="M24.5.996H1.746V23.75H24.5V.996Z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="currentColor"
        d="M17.932.996h-3.834v15.499c0 1.847-1.475 3.363-3.31 3.363-1.836 0-3.31-1.516-3.31-3.363 0-1.814 1.441-3.298 3.211-3.364v-3.89c-3.9.065-7.046 3.264-7.046 7.254 0 4.023 3.211 7.255 7.177 7.255 3.966 0 7.178-3.265 7.178-7.255V8.548a8.88 8.88 0 0 0 5.08 1.714v-3.89c-2.884-.1-5.146-2.474-5.146-5.376Z"
      />
    </g>
  </svg>
);
export const XSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.176 4.242h2.76l-6.03 6.778L21 20.242h-5.554l-4.35-5.593-4.979 5.593H3.355l6.45-7.249L3 4.243h5.695l3.933 5.112 4.548-5.113Zm-.969 14.376h1.53L7.864 5.78h-1.64l9.983 12.837Z"
    />
  </svg>
);
export const FBSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 10.061C20 4.505 15.523 0 10 0S0 4.505 0 10.061C0 15.083 3.657 19.245 8.438 20v-7.03h-2.54V10.06h2.54V7.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V20c4.78-.755 8.437-4.917 8.437-9.939Z"
    />
  </svg>
);
export const YoutubeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831ZM9.996 15.005l.005-6 5.207 3.005-5.212 2.995Z"
    />
  </svg>
);
export const PlaySVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={86}
    height={89}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M59.854 40.334 30.96 23.654c-3.208-1.857-7.223.462-7.223 4.166v33.36c0 3.704 4.015 6.022 7.223 4.166l28.893-16.68c3.208-1.848 3.208-6.484 0-8.332Z"
    />
  </svg>
);
export const PhoneSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.62 11.57c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
    />
  </svg>
);
export const LocationSVG = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      d="M12 2.344c2.024 0 3.803.704 5.355 2.133 1.524 1.401 2.3 3.285 2.3 5.705 0 .985-.217 1.97-.659 2.958a15.67 15.67 0 0 1-1.708 2.912 23.189 23.189 0 0 1-2.253 2.62 55.04 55.04 0 0 1-2.302 2.186l-.006.005-.004.005a.823.823 0 0 1-.318.188c-.146.047-.283.069-.413.069s-.263-.022-.402-.068a.765.765 0 0 1-.3-.183l-.009-.009-.01-.008a52.53 52.53 0 0 1-2.306-2.184 23.181 23.181 0 0 1-2.253-2.621 15.543 15.543 0 0 1-1.705-2.911c-.44-.989-.656-1.974-.656-2.96 0-2.42.776-4.303 2.297-5.704C8.198 3.049 9.976 2.344 12 2.344Zm0 .709c-1.935 0-3.59.669-4.932 2.003-1.35 1.342-2.014 3.065-2.014 5.126 0 1.42.594 2.958 1.698 4.603 1.105 1.646 2.745 3.475 4.907 5.485l.337.314.34-.309c2.213-2.007 3.87-3.838 4.953-5.49 1.079-1.648 1.657-3.187 1.657-4.603 0-2.06-.665-3.784-2.014-5.126v-.001C15.59 3.72 13.935 3.053 12 3.053ZM11.998 8.7c.366 0 .664.123.92.38.257.254.38.55.38.916s-.123.662-.378.917a1.234 1.234 0 0 1-.918.377c-.367 0-.663-.123-.917-.376a1.223 1.223 0 0 1-.377-.913c0-.322.094-.59.288-.824l.089-.098a1.22 1.22 0 0 1 .913-.379Z"
    />
  </svg>
);
export const MailSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20 4.78H4c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2Zm0 4-8 5-8-5v-2l8 5 8-5v2Z"
    />
  </svg>
);
export const MailWhiteSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      stroke="currentColor"
      d="M3.054 5.741v13.204h17.892V6.138l-.775.51-7.956 5.238a1.64 1.64 0 0 1-.158.075.196.196 0 0 1-.057.006.193.193 0 0 1-.057-.006 1.642 1.642 0 0 1-.159-.075l-7.73-5.091v-.4l7.673 5.026.273.18.273-.18 8.347-5.45 1.01-.66c.017.077.025.158.025.242v12.892c0 .322-.112.595-.361.843s-.524.36-.848.36H3.554c-.322 0-.595-.112-.843-.36l-.087-.094a1.115 1.115 0 0 1-.273-.749V5.553c0-.089.009-.173.026-.255l.677.443Zm.5-1.397h16.892c.324 0 .598.113.847.362.11.11.192.225.25.347H2.462c.059-.122.14-.238.25-.348.249-.249.522-.361.843-.361Z"
    />
  </svg>
);
export const CommercifySVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <rect width={30} height={30} x={5} y={5} fill="currentColor" rx={6} />
    <path
      fill="currentColor"
      d="M13.781 16.666h12v-6h-12v6Zm9.334-4.667h1.333a.333.333 0 1 1 0 .667h-.333v2.333a.333.333 0 1 1-.667 0v-2.333h-.333a.333.333 0 1 1 0-.667Zm-3 .334a.334.334 0 0 1 .631-.15l.702 1.404v-1.255a.333.333 0 1 1 .667 0V15a.334.334 0 0 1-.632.149l-.702-1.404V15a.333.333 0 1 1-.666 0v-2.666Zm-2.667 0c0-.185.149-.334.333-.334h1.334a.333.333 0 1 1 0 .667h-1v.667h.666a.333.333 0 1 1 0 .666h-.666v.667h1a.333.333 0 1 1 0 .667H17.78a.333.333 0 0 1-.333-.334v-2.666Zm-2.667 1.333v-1.333c0-.185.15-.334.334-.334h.666a.996.996 0 0 1 .476 1.874l.49.977a.333.333 0 1 1-.597.298l-.575-1.149h-.127v1a.333.333 0 1 1-.667 0v-1.333ZM22.117 17.334h1.334v.667h-1.334v-.667Z"
    />
    <path
      fill="currentColor"
      d="M16.112 13a.333.333 0 0 0-.333-.334h-.334v.667h.334c.184 0 .333-.15.333-.334ZM25.317 22l-1.035-3.106a.334.334 0 0 0-.316-.228h-8.373a.333.333 0 0 0-.316.228l-1.035 3.105h11.075ZM16.445 27h6.667v.667h-6.667V27ZM25.115 29.334h1.333c.184 0 .333-.15.333-.333v-.667h-2v.667c0 .184.15.333.334.333Z"
    />
    <path
      fill="currentColor"
      d="M27.45 27.333V23.95a.663.663 0 0 0-.368-.597l-1.377-.688H13.863l-1.377.688a.663.663 0 0 0-.369.597v3.382c0 .184.15.333.333.333h3.334v-.667c0-.367.299-.666.667-.666h6.666c.368 0 .667.299.667.666v.667h3.333c.184 0 .334-.15.334-.333Zm-12.666-.667h-.667a1.335 1.335 0 0 1-1.333-1.333c0-.368.299-.667.666-.667h.667c.735 0 1.333.598 1.333 1.333a.667.667 0 0 1-.666.667Zm8-1h-6a.333.333 0 1 1 0-.667h6a.333.333 0 1 1 0 .667Zm-9.333-1.667a.333.333 0 1 1 0-.666h12.666a.333.333 0 1 1 0 .666H13.45Zm12 2.667h-.667a.667.667 0 0 1-.667-.667c0-.735.598-1.333 1.334-1.333h.666c.368 0 .667.299.667.667 0 .735-.598 1.333-1.333 1.333ZM13.117 21.334h-.667a.333.333 0 0 0 0 .667h1v-.334a.333.333 0 0 0-.333-.333ZM13.115 29.334h1.333c.184 0 .333-.15.333-.333v-.667h-2v.667c0 .184.15.333.334.333ZM26.117 22h1a.333.333 0 0 0 0-.666h-.666a.333.333 0 0 0-.334.333v.334Z"
    />
    <path
      fill="currentColor"
      d="M24.781 26h.667a.667.667 0 0 0 .667-.666h-.667a.667.667 0 0 0-.667.667ZM16.117 17.334h1.334v.667h-1.334v-.667ZM14.112 25.334h-.667c0 .368.3.667.667.667h.667a.667.667 0 0 0-.667-.667Z"
    />
  </svg>
);