/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DataTable, Provider} from 'react-native-paper';
import {studentData} from './studentData';

const MyComponent = ({theme}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentDataToPage, setCurrentDataToPage] = React.useState([]);

  React.useEffect(() => {
    console.log(studentData);

    const dataProcess = async () => {
      function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
        }
        return res;
      }

      const chunkOfData = await sliceIntoChunks(studentData, 10);
      console.log('chunkOfData', Array.isArray(chunkOfData));
      console.log('chunkOfData[currentPage -1]', chunkOfData[currentPage - 1]);
      var data = await chunkOfData[currentPage - 1];
      setCurrentDataToPage(data);
    };
    dataProcess();
  }, [currentPage]);

  console.log('currentDataToPage', currentDataToPage);

  return (
    <>
      <DataTable>
        <ScrollView>
          <DataTable.Header theme={theme}>
            <DataTable.Title theme={theme}>Dessert</DataTable.Title>
            <DataTable.Title numeric theme={theme}>
              Calories
            </DataTable.Title>
            <DataTable.Title numeric theme={theme}>
              Fat
            </DataTable.Title>
          </DataTable.Header>
        </ScrollView>

        {currentDataToPage?.map(item => (
          <DataTable.Row theme={theme} key={item.ID}>
            <DataTable.Cell theme={theme}>{item.Name}</DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>
              {item.ID}
            </DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>
              {item.Gender}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
           showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}

        /> */}
      </DataTable>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 30,
          width: Dimensions.get('window').width,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width / 3,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Button
            title="prev"
            onPress={() => setCurrentPage(currentPage - 1)}
          />
          <Text>{currentPage}</Text>
          <Button
            title="next"
            onPress={() => setCurrentPage(currentPage + 1)}
          />
        </View>
      </View>
    </>
  );
};

export default MyComponent;
