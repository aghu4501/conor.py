marks=int(input("Enter your marks: "))
if marks>100 or marks<0:
    print("invalid marks")
else:
    if marks>=90:
        print("A grade")
    elif marks>=80:
        print("B grade")
    else:
        print("C grade")    