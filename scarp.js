import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DataTable, Provider } from 'react-native-paper';
import {studentData} from './studentData'


const MyComponent = ({ theme }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentDataToPage, setCurrentDataToPage] = React.useState([])
  const items = [
    {
      'name': 'Frozen yogurt',
      'cal': 159,
      'fat': 6.0,
      'email': "pavan@gmail.com",
      'gender': "Male"
    },
    {
      'name': 'Ice cream sandwich',
      'cal': 237,
      'fat': 8,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Mathias Heaney",
      "cal": 56347,
      "fat": 813,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Teresa Friesen",
      "cal": 49,
      "fat": 770,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Brisa Dickinson I",
      "cal": 72,
      "fat": 275223475,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Dr. Lia Wisozk",
      "cal": 645109,
      "fat": 77928,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Ella Ratke V",
      "cal": 51197,
      "fat": 865,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Claude Jast",
      "cal": 84778643,
      "fat": 87331,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Mrs. Estella Swift IV",
      "cal": 62839,
      "fat": 4,
      'email': "pavan@gmail.com",
      'gender': "Male"


    },
    {
      "name": "Dr. Bernie Rodriguez V",
      "cal": 428411,
      "fat": 27453580,
      'email': "pavan@gmail.com",
      'gender': "Male"


    }
  ];

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

          const chunkOfData = await sliceIntoChunks(studentData, 10)
          console.log('chunkOfData', Array.isArray(chunkOfData))
          console.log('chunkOfData[currentPage -1]', chunkOfData[currentPage - 1])
          var data = await chunkOfData[currentPage - 1];
          setCurrentDataToPage(data)
      }
      dataProcess()
  }, [currentPage])

  console.log('currentDataToPage', currentDataToPage)

  return (
    <Provider>
      <DataTable>
        <ScrollView>
          <DataTable.Header theme={theme}>
            <DataTable.Title theme={theme}>Dessert</DataTable.Title>
            <DataTable.Title numeric theme={theme}>Calories</DataTable.Title>
            <DataTable.Title numeric theme={theme}>Fat</DataTable.Title>
            <DataTable.Title numeric theme={theme}>Fruit</DataTable.Title>
            <DataTable.Title numeric theme={theme}>email</DataTable.Title>
            <DataTable.Title numeric theme={theme}>gender</DataTable.Title>
          </DataTable.Header>
        </ScrollView>

         {items?.map((item) => (
          <DataTable.Row theme={theme} style={{ backgroundColor: 'red' }} key={item.name}>
            <DataTable.Cell theme={theme}>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>{item.cal}</DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>{item.fat}</DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>{item.email}</DataTable.Cell>
            <DataTable.Cell numeric theme={theme}>{item.gender}</DataTable.Cell>
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
    </Provider>
  );
}

export default MyComponent;