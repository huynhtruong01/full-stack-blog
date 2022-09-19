```sh
blogs_project
|__src
    |__components
        |__common
            |__index.ts # export all components in common
            |__Header.tsx
            |__Footer.tsx
        |__fieldControls
            |__index.ts
            |__InputField.tsx
            |__PasswordField.tsx
    |__features
        |__blogs
            |__index.tsx # entry point, default export, routing declaration
            |__components
                |__index.ts # export all components
                |__BlogsForm.tsx
            |__pages
                |__index.ts # export all pages
                |__BlogsHome
```
