import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Table,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

const borderColor = '#C1C0B9';
const primaryColor = '#ddeee0';
const backgroundColor = '#F7F6E7';

export default function TableWithHeaders({tableHead, recordData, tableData, headerHeight, leftColumnWidth}) {
  const leftRef = useRef<ScrollView>(null);
  const rightRef = useRef<ScrollView>(null);

  

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ff0abb',
      }}
    >
      {/* Left Column */}
      <View
        style={{
          width: leftColumnWidth,
          backgroundColor: 'rgb(0, 100, 200)',
          borderRightWidth: 1,
          borderRightColor: borderColor,
        }}
      >
        {/* Blank Cell */}
        <View
          style={{
            height: headerHeight,
            backgroundColor: primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
          }}
        ></View>
        {/* Left Container : scroll synced */}
        <ScrollView
          ref={leftRef}
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor,
            }}
          >
            {recordData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={[leftColumnWidth]}
                style={index % 2 ? styles.row : { backgroundColor, height: headerHeight,}}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
      {/* Right Column */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor }}>
              <Row
                data={tableHead}
                style={{ height: headerHeight, backgroundColor: primaryColor, color: 'black' }}
                textStyle={{ ...styles.text, color: 'black', width: 50 }}
              />
            </Table>
            <ScrollView
              ref={rightRef}
              style={styles.dataWrapper}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={(e) => {
                const { y } = e.nativeEvent.contentOffset;
                leftRef.current?.scrollTo({ y, animated: false });
              }}
            >
              <Table borderStyle={{ borderWidth: 1, borderColor }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={index % 2 ? {height: headerHeight, color: 'black' } : { backgroundColor, height: headerHeight, color: 'black' }}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee', color: 'black' },
  head: { height: 40, backgroundColor: primaryColor, color: 'black' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa', color: 'black' },
  row: { height: 80, },
  text: { textAlign: 'center', color: 'black' },
  dataWrapper: { marginTop: -1 },
});