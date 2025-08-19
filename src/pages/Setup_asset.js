// Minimal parent for Setup_asset and Setup_AssetChangeRate (no router, no effects)
import { useState } from "react";
import SetupAssets from "./Setup_asset1";
import SetupAssetChangeRate from "./Setup_asset2";

export default function SetupMyAsset({onPrev, onNext}) {
  // shared state lives here
  const [assetList, setAssetList] = useState([]);
  // simple step toggle: 'asset' | 'changeRate'
  const [step, setStep] = useState("asset");

  const goAsset = () => setStep("asset");
  const goChangeRate = () => setStep("changeRate");

  return (
    <div className="setup-page">
      {step === "asset" ? (
        <SetupAssets
          assetList={assetList}
          setAssetList={setAssetList}
          onPrev={onPrev}
          onNext={goChangeRate}
        />
      ) : (
        <SetupAssetChangeRate
          assetList={assetList}
          setAssetList={setAssetList}
          onPrev={goAsset}
          onNext={onNext}
        />
      )}
    </div>
  );
}