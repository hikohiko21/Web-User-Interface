import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import NESTLine from "../../../components/NESTLine";
import { NESTTooltipFC } from "../../../components/NESTTooltip/NESTTooltip";
import useFuturesPOrder from "../../../hooks/useFuturesPOrder";
import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesPrice } from "../Futures";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";
import FuturesOrderListInfo, {
  FuturesOrderListInfoMain,
} from "./FuturesOrderListInfo";
import OrderListPosition from "./OrderListPosition";
import { Trans, t } from "@lingui/macro";

interface POrderListProps {
  data: FuturesOrderService;
  price: FuturesPrice | undefined;
  buttonCallBack: (value: FuturesModalInfo) => void;
}

const POrderList: FC<POrderListProps> = ({ ...props }) => {
  const {
    tokenName,
    isLong,
    lever,
    showBasePrice,
    showTriggerTitle,
    tp,
    sl,
    showLiqPrice,
    showMarginAssets,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
  } = useFuturesPOrder(props.data, props.price);

  return (
    <Stack
      spacing={"20px"}
      sx={(theme) => ({
        padding: "20px",
        width: "100%",
        borderRadius: "12px",
        background: theme.normal.bg1,
      })}
    >
      <ShareMyOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
        isClosed={false}
      />
      <OrderListPosition
        tokenName={tokenName}
        lever={lever}
        isLong={isLong}
        shareCallBack={() => setShowShareOrderModal(true)}
      />
      <Stack spacing={"8px"}>
        <Stack direction={"row"} justifyContent={"space-around"}>
          <FuturesOrderListInfoMain spacing={"4px"} width={"100%"}>
            <Box component={"p"}>
              <Trans>Open Price</Trans>
            </Box>
            <Box component={"p"}>{showBasePrice}USDT</Box>
          </FuturesOrderListInfoMain>
          <FuturesOrderListInfoMain spacing={"4px"} width={"100%"}>
            <Box component={"p"}>
              <Trans>Actual Margin</Trans>
            </Box>
            <Stack
              direction={"row"}
              spacing={"4px"}
              alignItems={"flex-end"}
              component={"p"}
            >
              <span>{showMarginAssets}ATF</span>
              <span className={isRed ? "Short" : "Long"}>{showPercent}%</span>
            </Stack>
          </FuturesOrderListInfoMain>
        </Stack>
        <NESTLine />
        {!(tp === String().placeHolder && sl === String().placeHolder) ? (
          <Stack direction={"row"} justifyContent={"space-around"}>
            <FuturesOrderListInfo
              direction={"row"}
              spacing={"4px"}
              width={"100%"}
            >
              <Box component={"p"}>
                <Trans>Take Profit</Trans>
              </Box>
              <Box component={"p"}>{tp}USDT</Box>
            </FuturesOrderListInfo>
            <FuturesOrderListInfo
              direction={"row"}
              spacing={"4px"}
              width={"100%"}
            >
              <Box component={"p"}>
                <Trans>Stop Loss</Trans>
              </Box>
              <Box component={"p"}>{sl}USDT</Box>
            </FuturesOrderListInfo>
          </Stack>
        ) : (
          <></>
        )}

        <Stack direction={"row"} justifyContent={"space-around"}>
          <FuturesOrderListInfo
            direction={"row"}
            spacing={"4px"}
            width={"100%"}
          >
            <Stack
              direction={"row"}
              spacing={"4px"}
              alignItems={"center"}
              component={"p"}
            >
              <Box component={"p"}>Liq Price</Box>
              <NESTTooltipFC
                title={
                  <p>
                    <Trans>
                      Due to the market volatility, the actual liquidation price
                      may be different from the theoretical liquidation price .
                      Here is the theoretical liquidation price, for reference
                      only.
                    </Trans>
                  </p>
                }
              />
            </Stack>
            <Box component={"p"}>{showLiqPrice}USDT</Box>
          </FuturesOrderListInfo>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={"8px"}>
        {props.data.copy ? (
          <></>
        ) : (
          <>
            <MainButton
              title={t`Add`}
              onClick={() =>
                props.buttonCallBack({
                  data: props.data,
                  type: FuturesModalType.add,
                })
              }
              style={{ height: "40px", fontSize: 14 }}
            />
            <MainButton
              title={showTriggerTitle}
              onClick={() =>
                props.buttonCallBack({
                  data: props.data,
                  type: FuturesModalType.trigger,
                })
              }
              style={{ height: "40px", fontSize: 14 }}
            />
          </>
        )}

        <MainButton
          title={t`Close`}
          onClick={() =>
            props.buttonCallBack({
              data: props.data,
              type: FuturesModalType.close,
            })
          }
          style={{ height: "40px", fontSize: 14 }}
        />
      </Stack>
    </Stack>
  );
};

export default POrderList;
