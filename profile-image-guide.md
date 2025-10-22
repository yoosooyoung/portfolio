# 프로필 사진 사용 가이드

## 현재 상태
- 임시 이미지가 사용되고 있습니다 (placeholder)
- 실제 사진으로 교체하실 수 있습니다

## 사진 교체 방법

### ✅ 현재 설정됨
- 이미지 경로: `assets/img/profile.jpg`
- 자동 확장자 감지: jpg, jpeg, png, webp 지원
- 파일명: `profile` (확장자는 자동 감지)

### 지원되는 파일 형식
- `assets/img/profile.jpg`
- `assets/img/profile.jpeg`
- `assets/img/profile.png`
- `assets/img/profile.webp`

### 방법 1: 로컬 이미지 파일 사용 (현재 설정)
1. 프로필 사진을 `assets/img/` 폴더에 저장
2. 파일명을 `profile`로 설정 (확장자는 자유)
3. 자동으로 감지되어 표시됩니다

### 방법 2: 온라인 이미지 URL 사용
1. 이미지를 온라인에 업로드합니다 (GitHub, Imgur 등)
2. HTML에서 이미지 URL을 수정합니다:
   ```html
   <img src="https://your-image-url.com/profile.jpg" alt="유수영 프로필 사진" class="profile-image">
   ```

## 권장 사양
- **크기**: 최소 300x300px (정사각형 권장)
- **형식**: JPG, PNG, WebP
- **파일 크기**: 2MB 이하
- **스타일**: 프로페셔널한 사진 (정장, 깔끔한 배경)

## 현재 적용된 스타일
- 원형 이미지 (border-radius: 50%)
- 호버 시 확대 효과
- 그림자 효과
- 반응형 디자인 (모바일에서 자동 축소)
- 다크모드 호환
