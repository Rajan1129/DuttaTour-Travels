Add-Type -AssemblyName System.Drawing

$logoPath = "d:\dutta-tour-travel\client\public\logo.png"
$ogPath = "d:\dutta-tour-travel\client\public\og-default.jpg"

$logo = [System.Drawing.Image]::FromFile($logoPath)
$targetWidth = 1200
$targetHeight = 630

$bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$graphics.Clear([System.Drawing.Color]::White)

# Scale logo to fit nicely within 1200x630
# Logo dimensions: 1264 x 848
$logoTargetHeight = 520
$logoTargetWidth = [int]($logo.Width * ($logoTargetHeight / $logo.Height))
if ($logoTargetWidth -gt 1100) {
    $logoTargetWidth = 1100
    $logoTargetHeight = [int]($logo.Height * ($logoTargetWidth / $logo.Width))
}

$x = [int](($targetWidth - $logoTargetWidth) / 2)
$y = [int](($targetHeight - $logoTargetHeight) / 2)

$graphics.DrawImage($logo, $x, $y, $logoTargetWidth, $logoTargetHeight)

# Save as high-quality JPEG
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$bmp.Save($ogPath, $jpegCodec, $encoderParams)

$graphics.Dispose()
$bmp.Dispose()
$logo.Dispose()
Write-Host "og-default.jpg generated successfully."
