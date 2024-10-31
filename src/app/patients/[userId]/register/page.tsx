import Image from "next/image";
import patient from "@/public/assets/icons/logo-full.svg";
import register from "@/public/assets/images/register-img.png";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.action";

const Register = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max--w-[860px] flex-1 flex-col py-10">
          <Image
            src={patient}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src={register}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
