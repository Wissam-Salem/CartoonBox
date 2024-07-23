import "./Upgrade.css";
import Header from "../../components/Header/Header";
import {
  faBoxOpen,
  faCheck,
  faHippo,
  faMugHot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Plan from "../../components/Plan/Plan";

export default function Upgrade() {
  return (
    <div className="min-h-[inherit] bg-[#1B2021]">
      <Header />
      <div className="flex upgrade-body justify-center items-center flex-wrap gap-14 p-5 bg-[#1B2021]">
        <Plan
          planName="مجاني"
          planPrice="0"
          one={faXmark}
          two={faXmark}
          three={faCheck}
          four={faXmark}
          logo={faHippo}
          buy="الذهاب"
        />
        <Plan
          planName="اقتصادي"
          planPrice="10"
          one={faXmark}
          two={faCheck}
          three={faCheck}
          four={faXmark}
          logo={faMugHot}
          buy="طلب"
        />
        <Plan
          planName="مميز"
          planPrice="25"
          one={faCheck}
          two={faCheck}
          three={faCheck}
          four={faCheck}
          logo={faBoxOpen}
          buy="طلب"
        />
      </div>
    </div>
  );
}
