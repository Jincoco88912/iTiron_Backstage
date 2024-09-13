# 範例 API 說明書

## 簡介

這是範例 API 的說明文檔。該 API 提供了用戶管理的基本功能。

- **版本**: 1.0.0
- **聯繫方式**: 
  - 名稱: API 支持團隊
  - 郵箱: support@example.com
  - 網址: https://www.example.com/support

## 基本信息

### 服務器

- 生產環境: `https://api.example.com/v1`
- 測試環境: `https://staging-api.example.com/v1`

### 認證

本 API 使用 Bearer Token 進行身份驗證。在發送請求時，請在 Header 中包含以下內容：

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## API 端點

### 1. 獲取用戶列表

獲取分頁的用戶列表。

- **URL**: `/users`
- **方法**: GET
- **查詢參數**:
  - `page` (整數, 默認值: 1): 頁碼
  - `limit` (整數, 默認值: 10): 每頁項目數

#### 響應

- **200 OK**
  ```json
  {
    "data": [
      {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "createdAt": "2024-09-04T12:00:00Z"
      },
      // ... 更多用戶
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10
    }
  }
  ```

### 2. 創建新用戶

創建一個新的用戶帳戶。

- **URL**: `/users`
- **方法**: POST
- **請求體**:
  ```json
  {
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securepassword"
  }
  ```

#### 響應

- **201 Created**
  ```json
  {
    "id": 101,
    "username": "newuser",
    "email": "newuser@example.com",
    "createdAt": "2024-09-04T14:30:00Z"
  }
  ```

### 3. 獲取特定用戶

獲取指定 ID 的用戶信息。

- **URL**: `/users/{userId}`
- **方法**: GET
- **路徑參數**:
  - `userId` (整數): 用戶 ID

#### 響應

- **200 OK**
  ```json
  {
    "id": 1,
    "username": "user1",
    "email": "user1@example.com",
    "createdAt": "2024-09-04T12:00:00Z"
  }
  ```

### 4. 更新用戶信息

更新指定 ID 用戶的信息。

- **URL**: `/users/{userId}`
- **方法**: PUT
- **路徑參數**:
  - `userId` (整數): 用戶 ID
- **請求體**:
  ```json
  {
    "username": "updateduser",
    "email": "updateduser@example.com"
  }
  ```

#### 響應

- **200 OK**
  ```json
  {
    "id": 1,
    "username": "updateduser",
    "email": "updateduser@example.com",
    "createdAt": "2024-09-04T12:00:00Z"
  }
  ```

### 5. 刪除用戶

刪除指定 ID 的用戶。

- **URL**: `/users/{userId}`
- **方法**: DELETE
- **路徑參數**:
  - `userId` (整數): 用戶 ID

#### 響應

- **204 No Content**: 刪除成功，無響應體

## 錯誤處理

API 使用標準的 HTTP 狀態碼表示請求的結果。在發生錯誤時，響應體將包含錯誤信息。

### 錯誤響應格式

```json
{
  "message": "錯誤描述",
  "errors": [
    "具體錯誤信息1",
    "具體錯誤信息2"
  ]
}
```

### 常見錯誤碼

- **400 Bad Request**: 請求無效
- **401 Unauthorized**: 未提供認證信息或認證失敗
- **403 Forbidden**: 沒有權限訪問請求的資源
- **404 Not Found**: 請求的資源不存在
- **500 Internal Server Error**: 服務器內部錯誤

## 結語

這個 API 說明書提供了使用範例 API 的基本指南。如果您有任何問題或需要進一步的幫助，請聯繫我們的支持團隊。