import Image from "next/image";
import img from "../../public/parbhat.png";
const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center w-full justify-between">
        <div className="flex items-center gap-4">
          uhbn
          <Image
            src={img}
            alt="Parbhat Kapila"
            width={64}
            priority
            height={64}
            className="object-cover rounded-full"
          />
          <div className="relative">
            <div className="block md:hidden">
              <h1 className="text-xl leading-normal font-semibold">
                Parbhat Kapila
              </h1>
              <p className="text-muted-foreground text-lg font-medium leading-none">
                Startup Engineer
                <br />
                <span className="font-medium text-sm">
                  Full Stack Developer
                </span>
              </p>
            </div>
            <div className="hidden md:block">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
