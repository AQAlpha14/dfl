import { Icon } from "@iconify/react";
import Link from "next/link";

const SocialAuthentication = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 pt-4">
      <div className="max-w-sm space-y-2">
        <div className="border rounded-md w-3xs flex items-center justify-center py-2 px-2">
          <Link href={`/`}>
            <div className="flex items-center gap-4">
              <Icon
                icon="devicon:apple"
                width="1.5rem"
                height="1.5rem"
                className="mx-auto"
              />
              <span className="font-semibold">Continue with Apple</span>
            </div>
          </Link>
        </div>
        <div className="border rounded-md w-3xs flex items-center justify-center py-2 px-2">
          <Link href={`/`}>
            <div className="flex items-center gap-4">
              <Icon
                icon="flat-color-icons:google"
                width="1.5rem"
                height="1.5rem"
                className="mx-auto"
              />
              <span className="font-semibold">Continue with Google</span>
            </div>
          </Link>
        </div>
        <div className="border rounded-md w-3xs flex items-center justify-center py-2 px-2">
          <Link href={`/`}>
            <div className="flex items-center gap-4">
              <Icon
                icon="logos:facebook"
                width="1.5rem"
                height="1.5rem"
                className="mx-auto"
              />
              <span className="font-semibold">Continue with Fascebook</span>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default SocialAuthentication;
