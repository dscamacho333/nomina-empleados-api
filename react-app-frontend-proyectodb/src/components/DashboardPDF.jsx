import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

export const DashboardPDF = ({ title, chartImage }) => (
  <Document>
    <Page style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
        {title}
      </Text>
      <View style={{ marginBottom: 20 }}>
        {chartImage && (
          <Image src={chartImage} style={{ width: "100%", height: "auto" }} />
        )}
      </View>
    </Page>
  </Document>
);
