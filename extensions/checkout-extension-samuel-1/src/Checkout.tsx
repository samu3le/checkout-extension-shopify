import {
  reactExtension,
  Banner,
  Button,
  BlockStack,
  Checkbox,
  TextField,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();

  const [isVisible, setIsVisible] = useState(false);

  if (!instructions.attributes.canUpdateAttributes) {
    return (
      <Banner title="checkout-extension-samuel-1" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <Banner title="checkout-extension-samuel-1">
        <Button
          onPress={() => {
            setIsVisible(!isVisible);
            if (isVisible==false) onChangeGiftMessage("");
          }}
        >
          {isVisible ? "Hide note" : "Add note"}
        </Button>
      </Banner>
      {isVisible && (
        <TextField 
          label="Gift text" 
          maxLength={250} 
          onChange={onChangeGiftMessage}
        />
      )}
    </BlockStack>
  );
  async function onChangeGiftMessage(value: string) {
    const result = await applyAttributeChange({
      key: "requestedGiftMessage",
      type: "updateAttribute",
      value: value,
    });
    console.log("applyAttributeChange result", {result, value});
  }
}
