# Project Intro

### 專案介紹

HeyMD 是一個類似於 HackMD 的線上 markdown 編輯器。

### 為什麼要做這個題目?

其實我對於 side project 一直都沒有一個很明確的想法，我本來想做 CRM 系統或是 data dashboard，但是沒有想到很明確的應用場景或問題。直到有一天，看到有人做了類似 Google spreadsheet 的應用程式，讓我想到也許我可以自己做一個類似 HackMD 的應用程式。

做這個題目有的好處是：

1. 我自己就是 HackMD 的使用者，因此對於產品本身的功能與應用場景有一定程度的瞭解，讓我進而能夠拆解其功能與 user story，幫自己的 side project 找到合適的大小 (scope) 與問題
2. 由於有一個已存在的產品可以當作參考，因此我可以直接模仿該產品本身的視覺設計 (layout, color theme, etc..)，將學習重心放在工程面的實現。雖然這邊講說不用自己做視覺設計，但是要能夠刻出一個一模一樣畫面的應用程式，也是有挑戰性。
3. 最後，透過模仿一個既有產品，更能夠深刻認識到技術與問題的深度，以及自己與他們的差距。

---

### 實作技術

專案主要可以分成兩個部分：後端 API server 與前端 React app。由於這次希望能夠熟練 React 相關技術，因此會將大部分時間放在前端 React app 上。

後端主要使用的技術為

- Node.js
- Express.js
- MySQL
- Passport (JWT)
- Heroku (Deployment)

同時也用 Swagger 做了 API doc 以方便未來在開發前端時作測試。

雖然 API server 只會有最低限度的開發，所以未來也不太會有變動的機會，若行有餘力也會希望能夠把測試做好。測試是確認產品功能的重要防線。

前端主要使用

- React
- React-router
- Redux 和 Redux Saga
- 其他 React 相關套件，譬如 react-hook-form, toastify 等
- CSS framework (Material UI)

---

### 專案挑戰

以 9/17 劃分專案開發前後兩個階段，在 9/17 前的第一階段，主要完成功能如下：

- API server 開發
- 前端 UI 設計
- React 架構 (React, React Hook, Redux, Redux Saga)
- Note 的 CRUD
- 路由與權限劃分

在第二階段，主要完成

- 邀請他人加入共筆功能
- 多人共筆功能

原本以為實作 socket 之後，就可以完成多人共筆的功能，但實際上問題比想像中的複雜。

**關於真正意義上的共筆**

最一開始開發的時候，是透過 socket 的 broadcast 功能，讓所有人可以即時分享當前的文件內容，但遇到第一個問題是，畫面會有兩個資料更新來源：local 的 user input 與 socket broadcast message，兩者都同時更新的話，基本上使用者打字的時候會相當的卡。因此，我透過 debounce 來減緩 socket broadcast message 在 local 端的更新頻率。

但如果有兩個使用者同時送出訊息，譬如原本的文件內容為

```
cat
```

A 做了編輯之後，送出的資訊為

```
cat!
```

B 做了編輯之後，送出的資訊為

```
My cat
```

假設 A 的訊息搶先一步進入 server，存檔之後並透過 socket broadcast 出來，A 的確可以看到自己的畫面為 `cat!`，但對 B 來說就很奇怪了，因為 B 的訊在送進 server 之前，就會先收到來自 server 的更新訊息 `cat!`，並更新畫面。緊接著，當 B 的訊息也進入 server 並 broadcast 後，A 的畫面會變成 `My cat`，而不是原先的 `cat!`，也就是說，A 的編輯遺失了，或者說，該文件被 B 版本的編輯給覆蓋掉了。

若要同時考慮並接納來自多方的編輯，而非單純的版本前後覆寫，就需要使用 "[Differential Synchronization](https://neil.fraser.name/writing/sync/)" 做法。這個方法在 2009 年由 Google 軟體工程師 Neil Fraser 所發表，也是當今線上即時共筆應用程式的基礎。理論不難理解，但實作上有一定的挑戰，好在 Google 提供了 [diff-match-patch](https://www.npmjs.com/package/diff-match-patch) 套件，讓大家有機會快速實作。

在 HeyMD 的專案當中，實作步驟如下：

1. 當使用者 A 進入一個 note 時，先從資料庫抓出資料
2. 當使用者 A 編輯時，會透過 socket 發布編輯內容 (patches)，並同時更新 local 的「參考版本」與「畫面」
3. 當 server 收到編輯內容 (patch)，更新資料庫當中的檔案，並向所有使用者 broadcasr 編輯內容 (patch)
4. 當使用者 B 收到來自 server 的編輯內容 (patches) 後，會先判斷這個內容是否來自自己。若否，則跟自己 local 的參考版本比對差異，然後更新 local 的「參考版本」與「畫面」。

也就是說，每一位使用者都會接收到同樣的編輯內容 (patches)，雖然先後順序不一樣，但是透過 patch 方法，可以達到每一位使用者文件版本一樣的狀態。

**關於游標 (caret) 位置**

由於目前的 markdown 編輯器只是一個 "textarea"，所以如果沒有做任何特別的操作，游標理論上會停在最後更新的地方。假如使用者 A 正在編輯 line 3，而使用者 B 正在編輯 line 5，當使用者 B 的 patch 透過 socket 而來並更新使用者 A 的畫面之後，此時游標就會跳到 line 5，而不是原本使用者 A 所在的 line 3。而實際上，其實就是會造成所有使用者畫面的游標「同步」，也就無法真正達成「同時多人共筆」的狀態。

因此，需要想辦法將 local 的游標固定在自己當前編輯的位置上，而不受外來編輯的影響。這裡我透過 Web API 當中的 `selectionStart` 來找到游標位置，以及 `setSelectionRange` 來設定游標位置。

在 HeyMD 的專案當中，實作步驟如下：

1. 在 local input 的情況下，隨著每一次的 onChange, onClick, onKeypress event，呼叫 `selectionStart` 找到游標位置，並將最新的位置存在 localStorage 當中
2. 當接收到外部的編輯內容 (patches)，更新當前畫面內容，並立刻找最近一次存在 localStorage 當中的游標位置，並透過`setSelectionRange` 來設定將游標設定回指定位置。
3. 另一方面，游標位置其實是「相對的」，它的位置是從 textarea 的起頭開始算的字串位置。假設游標原本在 `cat` 的最後，也就是 `3` 的位置，當今天若因為外來編輯而成為了 `My cat`， `3` 的位置就會變成在 cat 前面，對於 local 的使用者來說，游標其實離開了原先編輯的位置。因此需要透過 socket broadcast 而來的 `patches` 的資料，計算出編輯的位置與長度，重新算出當前游標應該要在的位置。

**延伸問題**

1. 若要讓編輯器有更大的彈性，譬如顯示不同使用者當前的游標位置等，就需要使用 `<div contenteditable="true">` 的屬性，不過以我目前使用的第三方套件暫時做不到。

2. 目前透過 socket broadcast 的資料 (patches)，都會先進入 server 進行資料庫的操作。當前使用 MySQL 資料庫，猜想在效能上很快就會遇到瓶頸。

3. 目前 HeyMD 當中前後端關於 Differential Synchronization 的設計，並沒有考慮到「掉包（pathces)」的狀況，因此若 client 一時斷線，或是 server 一時無法處理某位使用者送來的 patches，可能就會造成問題。

---

### 未來發展

HeyMD 對我來說是一個非常有趣也很有意義的專案，未來會希望在編輯器與共筆系統上持續改進，讓 HeyMD 有機會能夠更接近 HackMD！

若對我的專案有興趣，可以到以下的 repo 逛逛：

- 前端：https://github.com/tsungtingdu/hackmd_clone_react
- 後端：https://github.com/tsungtingdu/hackmd_clone_api_server

也歡迎在 repo 當中留下任何的想法或建議 :)
