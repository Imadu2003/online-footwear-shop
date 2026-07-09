# Setup Frontend Structure
$frontendSrc = "d:\MERN-Stack\online-footwear-shop\frontend\src"

# Directories
$dirs = @(
    "$frontendSrc\assets",
    "$frontendSrc\components\common",
    "$frontendSrc\components\admin",
    "$frontendSrc\components\customer",
    "$frontendSrc\pages\admin",
    "$frontendSrc\pages\customer",
    "$frontendSrc\layouts",
    "$frontendSrc\context",
    "$frontendSrc\hooks",
    "$frontendSrc\utils"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path -Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Backend Structure
$backend = "d:\MERN-Stack\online-footwear-shop\backend"
$backendDirs = @(
    "$backend\config",
    "$backend\controllers",
    "$backend\models",
    "$backend\routes",
    "$backend\middleware",
    "$backend\utils"
)

foreach ($dir in $backendDirs) {
    if (-not (Test-Path -Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Function to create boilerplate React component
function Create-ReactComponent {
    param([string]$Path, [string]$Name)
    $content = "import React from 'react';`n`nconst $Name = () => {`n  return (`n    <div>`n      <h1>$Name Page</h1>`n    </div>`n  );`n};`n`nexport default $Name;"
    Set-Content -Path $Path -Value $content -Force
}

# Layouts
Set-Content -Path "$frontendSrc\layouts\MainLayout.jsx" -Value "import React from 'react';`nimport { Outlet } from 'react-router-dom';`n`nconst MainLayout = () => {`n  return (`n    <div className=`"main-layout`">`n      <header>Customer Navbar</header>`n      <main className=`"container`">`n        <Outlet />`n      </main>`n      <footer>Customer Footer</footer>`n    </div>`n  );`n};`n`nexport default MainLayout;" -Force

Set-Content -Path "$frontendSrc\layouts\AdminLayout.jsx" -Value "import React from 'react';`nimport { Outlet } from 'react-router-dom';`n`nconst AdminLayout = () => {`n  return (`n    <div className=`"admin-layout`">`n      <aside>Admin Sidebar</aside>`n      <main>`n        <Outlet />`n      </main>`n    </div>`n  );`n};`n`nexport default AdminLayout;" -Force

# Pages - Customer
Create-ReactComponent -Path "$frontendSrc\pages\customer\Home.jsx" -Name "Home"
Create-ReactComponent -Path "$frontendSrc\pages\customer\Shop.jsx" -Name "Shop"
Create-ReactComponent -Path "$frontendSrc\pages\customer\ProductDetails.jsx" -Name "ProductDetails"
Create-ReactComponent -Path "$frontendSrc\pages\customer\Cart.jsx" -Name "Cart"
Create-ReactComponent -Path "$frontendSrc\pages\customer\Checkout.jsx" -Name "Checkout"
Create-ReactComponent -Path "$frontendSrc\pages\customer\About.jsx" -Name "About"

# Pages - Admin
Create-ReactComponent -Path "$frontendSrc\pages\admin\Dashboard.jsx" -Name "Dashboard"
Create-ReactComponent -Path "$frontendSrc\pages\admin\ManageProducts.jsx" -Name "ManageProducts"
Create-ReactComponent -Path "$frontendSrc\pages\admin\ManageOrders.jsx" -Name "ManageOrders"

Write-Host "Structure created successfully."
