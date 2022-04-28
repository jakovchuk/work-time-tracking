run:
	docker run -dp 8080:8080 -v C:\Works\My_Project2\work-time-tracking:/app -v /app/node_modules --rm --name worktime worktime
run-nr:
	docker run -dp 8080:8080 -v C:\Works\My_Project2\work-time-tracking:/app -v /app/node_modules --name worktime worktime
stop:
	docker stop worktime
login:
	cat ./my_password.txt | docker login --username jakovchuk --password-stdin
