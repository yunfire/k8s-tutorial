const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());

// 路由
// 修改版本號來測試 CI/CD
app.get('/', (req, res) => {
  res.json({
    message: ' 歡迎來到 K8s 學習項目！',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    pod: process.env.HOSTNAME || 'unknown',
    version: '1.0.4',  // 更新版本號
    build: 'CI/CD Test' // 添加構建標識
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    version: '1.0.4',
    features: ['Kubernetes', 'Docker', 'CI/CD', 'Node.js'],
    learning: 'K8s 基礎概念和部署流程',
    endpoints: [
      'GET / - 主頁',
      'GET /health - 健康檢查',
      'GET /api/info - 應用信息'
    ]
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    pod: process.env.HOSTNAME || 'unknown',
    nodeVersion: process.version,
    platform: process.platform
  });
});

// 啟動服務器
app.listen(PORT, '0.0.0.0', () => {
  console.log(` 服務器運行在端口 ${PORT}`);
  console.log(` 健康檢查: http://localhost:${PORT}/health`);
  console.log(` 應用信息: http://localhost:${PORT}/api/info`);
  console.log(` 狀態檢查: http://localhost:${PORT}/api/status`);
}); 