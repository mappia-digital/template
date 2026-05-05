import { ImageResponse } from "next/og"
import { clientData } from "../client-data"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: clientData.branding.primaryColor,
          color: "white",
          fontWeight: 800,
          fontSize: 22,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 8,
        }}
      >
        {clientData.business.name.charAt(0)}
      </div>
    ),
    size,
  )
}
