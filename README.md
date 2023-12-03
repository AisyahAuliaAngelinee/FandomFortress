# **Fandom Fortress**: Make Your Lodging Like "**ISEKAI**"

### A simple webserver API that provides convenient and secure lodging listings. API that provides facilities to View, create, view in detail, and delete. APIs that can be used publicly, and can also be used as practice. Here is the link for the [**API**](https://vclrshna.online) that can be used.

---

# **Available End point Routes**

> **_EACH USER MUST LOG IN FIRST TO ACCESS EACH END POINT AND PROVIDE ACCESS TOKENS FOR EACH END POINT. ACCESS TOKEN CAN BE OBTAINED AT THE [<url>/login] END POINT_**

# **USER**

In the **USER** section, users can login and register. For the register case there are provisions that must be done. Register can only be done by accounts that have the admin role. If you want to get the admin role, contact an insider.

### [POST] https://vclrshna.online/login

The login end point is used by users to enter other end points such as **_creating_**, **_viewing_**, **_changing_**, and **_deleting_** existing data. The following results are given when accessing the end point.

- When the request is **successful**, this end point will give/return a token which is and **access token** to a particular end point. **ADMIN** can access all end points, **STAFF** only certain end points
- When the request fails during the input process, the user is expected to check the input again.

  - The **Email** does not match the format
  - The **Email** is not given
  - The **Email** has been used
  - The **Password** is not given
  - The **Password** is less than the specified length
  - The **Password** given exceeds the specified limit

**Success Login**

![Success](https://media.discordapp.net/attachments/712325980349530122/1180316758301753364/image.png?ex=657cfaa4&is=656a85a4&hm=4b17c5153725221e3faaf9e0e9c4337b9101401a8e94c42f7a4fa8b76253b3b6&=&format=webp&quality=lossless&width=2160&height=284)

**Failed Password**

![Password_Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180319293854973962/image.png?ex=657cfd00&is=656a8800&hm=6787a6f2bbf31acb5d3ddac53903febc409301e1b7b4d892010e2620cb1c6bc1&)

**Failed Email**

![Email_Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180319659539578910/image.png?ex=657cfd58&is=656a8858&hm=f63e65205f5a28c00e4bdea23982a5c9d5ba17c74fcd43c6bfa74d0f45079e54&)

**Failed Wrong Password/Email**

![Failed_Password](https://cdn.discordapp.com/attachments/712325980349530122/1180335137901264896/image.png?ex=657d0bc2&is=656a96c2&hm=e756654477b2573edc468bce816f723cc0032c9a3e6c538afabd3dfa8e9a517a&)

### [POST] https://vclrshna.online/add-user

The Register (**_add-user_**) end points is used to add a new user account. The register end point can only be accessed and used by **Admin** users only. **Staff** cannot access of create/add new users to the system.

- When the request is successful, the system will add the new user's personal data to the Database.
- When the request fails, you are welcome to recheck whether the input request is what the system wants or not.
- The request will fail if

  - The added user uses the same Email
  - The Email format does not match

**Success Create new User**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180323740349894818/image.png?ex=657d0125&is=656a8c25&hm=e9d5079380b2ae45f5ee657852edac775083d9c3fd91c1684c718aacd087d163&)

**Email Already Used**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180334257642684457/image.png?ex=657d0af0&is=656a95f0&hm=eaf2a9e684a0a83a03fe711e1b8e92cbb62e436f4b6d6e868e2196cad856aab5&)

**Failed Email Format**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180336147109531710/image.png?ex=657d0cb3&is=656a97b3&hm=1a836f7abb9e9ebeea2ce13b6fbe676a84b07347c639d3a25282677bb1a23d03&)

**Failed Email not Filled**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180336498906779658/image.png?ex=657d0d06&is=656a9806&hm=0c22ce4c56b72d03d04f6d08a640c41931a3c0242edeef142a5df77681ef809f&)

**Failed Password not Filled**

![Faield](https://cdn.discordapp.com/attachments/712325980349530122/1180336498906779658/image.png?ex=657d0d06&is=656a9806&hm=0c22ce4c56b72d03d04f6d08a640c41931a3c0242edeef142a5df77681ef809f&)

## **Lodging** (Fandom Fortress End points)

### [POST] https://vclrshna.online/fortress/add-fortress

Create Fortress is usually used by **Admin** and **Staff** to add new room data to the Database. This end point require and access token that can be accessed by **_Staff_** to register a new room.

- When the request is successful, it will return the results of the data that has been registered.
- When the request fails, the user is allowed to check again

  - There is an unfulfilled request
  - Does not have token access
  - The token provided is invalid

**Success Create Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180504831815843880/image.png?ex=657da9cc&is=656b34cc&hm=dddc961ed5d22148176934515c252786e3e066daaa78111c4ad2c4519064837b&)

**Failed Create Fortress**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180505284423200839/image.png?ex=657daa38&is=656b3538&hm=423292828152585f1172fdf005b21c44abab46abff927efe117d07c3cc5ecc9a&)

**Failed Access Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&=&format=webp&quality=lossless&width=1344&height=392)

**Failed Access Token Wrong**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

### [GET] https://vclrshna.online/fortress/fortress

This end point is used to display all fortress data registered in the database. Not only **Admins** can see the data but **Staff** are also given access to view all registered data.

- When the request is successful, it will return all the data registered in the Database.
- When the request fails, the user is allowed to check again

  - The token provided is correct
  - Has provided token access

**Success Fetch all Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180508560749248593/image.png?ex=657dad45&is=656b3845&hm=ba68ee34224e0aa777ffbae29cb8d032aeb7c0cacea7b468588460f038003833&)

**Failed Fetch all Fortress**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&)

**Failed Fetch all with Wrong Token**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&)

### [GET] https://vclrshna.online/fortress/fortress/:id

This end point is used to display on their _ID_ and display the selected data in detail. **Admin** can see all fortresses created by **Staff**. **Staff** can only see their own _ID_ based on the **Staff** _ID_ contained in the fortress list.

- When the request is successful it will return the selected fortress data.
- When the request fails, the user is allowed to check again

  - The intended _ID_ is registered in the Database or not
  - Select details that do not belong to him
  - The token Provided is wrong
  - The user does not provide a token

**Success Fetch Detail by ID**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180514382527086694/image.png?ex=657db2b1&is=656b3db1&hm=e67d264cfd369df3a8f044e51e0aceacd3f5b4513e418bebf80eaa8ebbc8733e&)

**Failed Fetch Detail by ID**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180514973101854790/image.png?ex=657db33e&is=656b3e3e&hm=82e5b57c9f7ddef5b694b13bbf07481671b676e296812d32767d81377a3f916e&)

**Failed Fetch, Token not provided**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&)

**Failed Fetch, Wrong Token**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&)

### [PUT] https://vclrshna.online/fortress/fortress/:id

This end point used to update the fortresses registered in the Database. **Admin** can update all fortress data. **Staff** only updates the fortress data they own and created.

- When the request is successful, the data will change in the datbase
- When the request fails, the user must check again

  - User not provide Access Token
  - Access an _ID_ that does not belong to him
  - The _ID_ is not found
  - The token given is wrong

**Success Update Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180520417832742942/image.png?ex=657db850&is=656b4350&hm=dcccfb90424ccd21670af96da6e45f9b494063a8823dc7533f5574ad3dfbc26b&)

**Failed Update Fortress, Staff id not valid**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180521006583009320/image.png?ex=657db8dc&is=656b43dc&hm=81d59e90625c333f8c3ab82fbfc318878a0aa4df84923ff5946664173f05240f&=&format=webp&quality=lossless&width=904&height=308)

**Failed Update Fortress, Token not provided**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&=&format=webp&quality=lossless&width=1344&height=392)

**Failed Update Fortress, Wrong Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

### [DELETE] https://vclrshna.online/fortress/fortress/:id

This end point is used to remove the fortress data from the Database. **Admin** can delete all fortresses. **Staff** can only delete their own fortress data.

- When the request is successful, the data will be deleted in the database
- When the request fails, the user is allowed to check again

  - The intended _ID_ does not exist
  - Chooses an _ID_ that is not his own
  - Does not provide a token
  - The token given is wrong

**Success Delete Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180522391194062949/image.png?ex=657dba27&is=656b4527&hm=551923050208d7fff500129759cce17ee8a7d7ac2546a92819d2bdbe31e4f1e5&)

**Failed Delete Fotress, ID not exist**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180514973101854790/image.png?ex=657db33e&is=656b3e3e&hm=82e5b57c9f7ddef5b694b13bbf07481671b676e296812d32767d81377a3f916e&)

**Failed Delete Fotress, Staff id not valid**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180521006583009320/image.png?ex=657db8dc&is=656b43dc&hm=81d59e90625c333f8c3ab82fbfc318878a0aa4df84923ff5946664173f05240f&=&format=webp&quality=lossless&width=904&height=308)

**Failed Delete Fortress, Wrong Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

### [PATCH] https://vclrshna.online/fortress/fortress/:id

This end point used to upload image from file to the fortresses registered in the Database. **Admin** can upload image all fortress data. **Staff** only can upload image the fortress data they own and created.

- When the request is successful, the data will change in the datbase
- When the request fails, the user must check again

  - User not provide Access Token
  - Access an _ID_ that does not belong to him
  - The _ID_ is not found
  - The token given is wrong

**Success Update Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180520417832742942/image.png?ex=657db850&is=656b4350&hm=dcccfb90424ccd21670af96da6e45f9b494063a8823dc7533f5574ad3dfbc26b&)

**Failed Update Fortress, Staff id not valid**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180521006583009320/image.png?ex=657db8dc&is=656b43dc&hm=81d59e90625c333f8c3ab82fbfc318878a0aa4df84923ff5946664173f05240f&=&format=webp&quality=lossless&width=904&height=308)

**Failed Update Fortress, Token not provided**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&=&format=webp&quality=lossless&width=1344&height=392)

**Failed Update Fortress, Wrong Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

# **Type**

### [POST] https://vclrshna.online/type/type-add

Create Fortress is usually used by **Admin** and **Staff** to add new room type to the Database. This end point require and access token that can be accessed by **_Staff_** to register a new room type.

- When the request is successful, it will return the results of the data that has been registered.
- When the request fails, the user is allowed to check again

  - There is an unfulfilled request
  - Does not have token access
  - The token provided is invalid

**Success Add Type**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180530359071428628/image.png?ex=657dc192&is=656b4c92&hm=2e6e04c663f118d1a7defbda11660e9824e746117848fdb501c99b41819c1bcd&)

**Failed Add Type**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180530794607939584/image.png?ex=657dc1fa&is=656b4cfa&hm=cbb620037537348120991ade2da428d3760025391cbd23c562eb97891146ab42&)

**Failed Access Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&=&format=webp&quality=lossless&width=1344&height=392)

**Failed Access Token Wrong**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

### [GET] https://vclrshna.online/type/type

This end point is used to display all type data registered in the database. Not only **Admins** can see the data but **Staff** are also given access to view all registered type data.

- When the request is successful, it will return all the type data registered in the Database.
- When the request fails, the user is allowed to check again

  - The token provided is correct
  - Has provided token access

**Success Fetch all Type**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180531534038585444/image.png?ex=657dc2aa&is=656b4daa&hm=65fa1dc77e9fe0c8a631b106abd85ee325aebf6fc4f6b2b7408e1fc6c5e288bd&)

**Failed Fetch all Type**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&)

**Failed Fetch all with Wrong Token**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&)

### [PUT] https://vclrshna.online/type/type/:id

This end point used to update the fortresses registered in the Database.

- When the request is successful, the data will change in the datbase
- When the request fails, the user must check again

  - User not provide Access Token
  - The _ID_ is not found
  - The token given is wrong

**Success Update Type**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180532533969043526/image.png?ex=657dc399&is=656b4e99&hm=8e312714a580e058c0b07d3835eccd238d05ba18e2dfdd24ad6c15f79ce6447d&)

**Failed Update Type, Token not provided**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180506092271313026/image.png?ex=657daaf9&is=656b35f9&hm=e773c0c4b73f609655071a5b18234fda32b945fede67e6c01794aac9d4043e9d&=&format=webp&quality=lossless&width=1344&height=392)

**Failed Update Type, Wrong Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

**Failed Update Type, ID not exist**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180533334619725874/image.png?ex=657dc458&is=656b4f58&hm=d57d2818de56d7495ccc46f23286b11f74868091d693e73a2c0765feeea73a89&)

### [DELETE] https://vclrshna.online/type/type/:id

This end point is used to remove the fortress data from the Database.

- When the request is successful, the data will be deleted in the database
- When the request fails, the user is allowed to check again

  - The intended _ID_ does not exist
  - Does not provide a token
  - The token given is wrong

**Success Delete Type**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180532818124746932/image.png?ex=657dc3dd&is=656b4edd&hm=c821c5bdc1c1a56027c978c19174dce06c14c92bddd682d8b5d4eef5aa1ea483&)

**Failed Delete Type, ID not exist**

![Failed](https://cdn.discordapp.com/attachments/712325980349530122/1180533334619725874/image.png?ex=657dc458&is=656b4f58&hm=d57d2818de56d7495ccc46f23286b11f74868091d693e73a2c0765feeea73a89&)

**Failed Delete Type, Wrong Token**

![Failed](https://media.discordapp.net/attachments/712325980349530122/1180505850188673065/image.png?ex=657daabf&is=656b35bf&hm=060bdbef09e9b54ead950c08e76c8d092599e50ac53555c72ccd2c280c4bc933&=&format=webp&quality=lossless&width=1536&height=328)

# **PUBLIC**

### [GET] https://vclrshna.online/public/

This end point is used by the user to display all available fortress data in the Database. The public end point displays the page features, filters (name, type, etc.), sorting, search, and data limits that you want to display. This end point does not require any authentication because this end point is publicly open.

- When the request is successful, it will display all existing fortress data. The default limit is 10 fortresses displayed

**Success Fetch all Fortress**

![Success](https://cdn.discordapp.com/attachments/712325980349530122/1180536183093215303/image.png?ex=657dc6ff&is=656b51ff&hm=0ab78cbb181b5385503df2c774ed03cf2a3cf1a1c8f24634df1f765fe763f72b&)

---

> **F.A.Q** how to use the pagination

###### `https://vclrshna.online/public/?page=<value>&limit=<value>&filter=<type_id>&sortBy=<value>&keyword=<value>`

- `page=<value>` = change the value with page_number (page=2)
- `limit=<value>` = change the value with limit_number (limit=3)
- `filter=<type_id>` = change the type_id (filter=1)
- `sortBy=<value>` = change the value with column name (sortBy=typeId)

  - `sortBy=name` = sort by ASCENDING
  - `sortBy=-name` = sort by DECENDING

- `keyword=<value>` = change the value with the title name or else (keyword=RedDoorz)

### [GET] https://vclrshna.online/public/:id

This end point is used to display the selected data in detail. This end point does not require any authentication because this end point is publicly open.

- When the request is successful it will return the selected fortress data.

**Success Fetch Detail by ID**

![Success](https://media.discordapp.net/attachments/712325980349530122/1180538695527444651/image.png?ex=657dc956&is=656b5456&hm=60501ede87cadc1ee2e2be62ebf5bbb604b2acd5384968026c4b4c3ae3fa754a&=&format=webp&quality=lossless&width=2160&height=774)
