---
id: je3r0g0z
title: Demo Swimm.io
file_version: 1.1.3
app_version: 1.18.2
---

side effect....
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/App.js
```javascript
121      useEffect(() => {
122        onGetJobs();
123      }, []);
```

<br/>

sdfsdf
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/App.js
```javascript
23       const onGetJobs = async () => {
24         const response = await Api.getJobs();
25         if (response) {
26           setJobs(response);
27         }
28       };
```

<br/>

`Api`<swm-token data-swm-token=":src/services/api.js:34:2:2:`const Api = {`"/> Instance

<br/>

xczzvxcv
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/services/api.js
```javascript
3      const getJobs = async () => {
4        return await base({
5          url: "/jobs",
6          method: "GET",
7          headers: {
8            "Content-Type": "application/json",
9          },
10       });
11     };
```

<br/>

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBdHJhZGllLWFwcCUzQSUzQWJhc3RhbnRlYm9t/docs/je3r0g0z).
