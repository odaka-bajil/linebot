set PATH=%PATH%;Z:\PortableGit\bin
git config --global http.proxy http://proxy1.ut.fks.ed.jp:8080

git pull
git add .
git commit -m "学校からのコミット"
git push
exit 